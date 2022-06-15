import { useEffect, useRef } from "react";
import * as d3 from 'd3';

const useD3=(svgCode, dependencies)=>{
    const ref = useRef();
    useEffect(() => {
        svgCode(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}

export default useD3;
