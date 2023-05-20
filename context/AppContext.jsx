import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios/');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los prods:', error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <AppContext.Provider value={{ usuarios, products }}>
      {children}
    </AppContext.Provider>
  );
};
