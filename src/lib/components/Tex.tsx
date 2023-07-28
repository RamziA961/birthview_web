import { Tex2SVG, Tex2SVGProps } from "react-hook-mathjax"



const Tex = (props: {
    children: string
} & Omit<Tex2SVGProps, 'children'>) => {
    const { styleProps, children } = props

    return <Tex2SVG 
        display='inline'
        {...styleProps}
        latex={children}
    />
}

export default Tex
