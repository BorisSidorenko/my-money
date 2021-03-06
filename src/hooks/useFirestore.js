import { useState, useReducer, useEffect } from "react";
import { projectFireStore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { ...initialState, isPending: true, error: null }
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { ...initialState, success: true }
        case 'ERROR':
            return { ...initialState, success: false, error: action.payload }
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFireStore.collection(collection);

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, deleteDocument, response }
}