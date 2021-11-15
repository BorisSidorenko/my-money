import { useState, useReducer, useEffect } from "react";
import { projectFireStore } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFireStore.collection(collection);

    const addDocument = (doc) => {

    }

    const deleteDocument = (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, deleteDocument, response }
}