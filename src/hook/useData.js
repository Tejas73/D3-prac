import { useEffect } from "react";
import { useState } from "react";
import * as d3 from "d3";

const csvUrlBar = "https://gist.githubusercontent.com/Tejas73/e417d317c2822a939e0ed1a2f9f14772/raw/d98ff4e78f6dcfe041b835ce2a4eedd44aabcabd/population.csv";

export const useDataBar = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.Population = parseFloat(d['Total Population (thousands)'] * 1000);
            return d;
        }
        d3.csv(csvUrlBar, row).then(setData);

    }, []);
    return data;
}

// const csvUrlScatter = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// export const useDataScatter = () => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const row = d => {
//             d.sepal_length = parseFloat(sepal_length);
//             d.sepal_width = parseFloat(sepal_width);
//             d.petal_length = parseFloat(petal_length);
//             d.petal_width = parseFloat(petal_width);
//             return d;
//         }
//         d3.csv(csvUrlScatter, row).then(setData);

//     }, []);
//     return data;
// }