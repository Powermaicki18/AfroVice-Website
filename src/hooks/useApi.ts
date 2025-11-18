import {useEffect, useState} from "react";
import * as React from "react";

export default function useApi<T>(promise: Promise<T>, defaultValue: T): [T, boolean, React.Dispatch<React.SetStateAction<T>>] {
    const [data, setData] = useState<T>(defaultValue);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        promise.then(response => {
            setData(response);
            setLoading(false);
        });
    }, []);

    return [data, loading, setData];
}
