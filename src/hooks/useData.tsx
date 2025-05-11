import { useState, useEffect } from "react";
import { apiGet } from "../utils/useApi";

// const API_VER = "/api/v1"

export const useData = (url:string) => {
    // const [state, setState] = useState("");
    const [data, setData] = useState<{ error: string; data: any; status: boolean }[]>([]);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        isLoading(true);
        apiGet(url)
        .then( resp => {setData(resp.data); isLoading(false);} )
        .catch(e => console.log(e));

    }, [url]);

    
    return [ data, loading ]
}