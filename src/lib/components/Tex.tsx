import { Tex2SVG } from "react-hook-mathjax"



const Tex = (props: {
    children: string
}) => <Tex2SVG display='inline' latex={props.children}/>

export default Tex
