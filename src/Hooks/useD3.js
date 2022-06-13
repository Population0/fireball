import { useRef } from "react";
import * as d3 from 'd3';

const useD3=(svgCode)=>{
const ref = useRef();
svgCode(d3.select(ref.current));
return ref;
}

export default useD3;
