import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
})

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        return quantity ? quantity: 0;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        if(quantity == 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                [
                    cartProducts.map(product => {
                        if (product.id == id) {
                            return {
                                ...product,
                                quantity: quantity + 1
                            }
                        } else {
                            return product;
                        }
                    } )
                ]
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);
        if(quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(product => {
                    if(product.id == id) {
                        return {
                            ...product,
                            quantity: quantity - 1
                        }
                    } else {
                        return product;
                    }
                })
            )
        }
    }

    function deleteFromCart(id) {
        productsArray = productsArray.filter(product => product.id != id)
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map(product => {
            const productData = getProductData(product.id);
            totalCost += productData.price * product.quantity;
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;