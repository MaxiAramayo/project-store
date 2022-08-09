import { useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";

export const useFirestore = () => {
    const [data, setData] = useState([]);
  
    const [error, setError] = useState([]);
  
    const [loading, setLoading] = useState({});
  
    //TRAE TODOS LOS COMERCIOS
    const getData = async () => {
      /* console.log(auth.currentUser); */
  
      try {
        setLoading((prev) => ({ ...prev, getData: true }));
        const dataRef = collection(db, "comercios");
  
        const q = query(dataRef);
        const querySnapshot = await getDocs(q);
        const dataDB = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setData(dataDB);
  
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, getData: false }));
      }
    };
  
    //TRAE UN COMERCIO POR ID
    const searchData = async (id) => {
      try {
        setLoading((prev) => ({ ...prev, searchData: true }));
        const dataRef = collection(db, "comercios");
        const q = query(dataRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const dataDB = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setData(dataDB);
  
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, searchData: false }));
      }
    };
  
    //TRAE UNA LA LISTA DE PRODUCTOS DE UN RESTAURANTE
    const getProductos = async (id) => {
      try {
        setLoading((prev) => ({ ...prev, getProductos: true }));
        const dataRef = collection(db, "comercios");
        const q = query(dataRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const dataDB = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setData(dataDB);
  
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, getProductos: false }));
      }
    };
  
  
    return [
      data,
      error,
      loading,
      getData,
      searchData,
      getProductos,
    ];
  };