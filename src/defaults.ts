interface DefaultEq {
    /**
     * LaTeX string of the equation.
     */
    eq: string,

    /**
     * Known value of the integral.
     */
    value: number
}


/**
 * A list of default equations, specified by the packet.
 */
export const defaultEqs: DefaultEq[] = [
    {
        eq: '\\int _0^1\\sqrt{\\frac{1+x}{1-x}}',
        value: (Math.PI / 2) + 1
    },
    /*{
        eq: '\\int_{0}^{\\infty}\\frac{\\ln\\left(1+x^{2}\\right)}{1+x^{2}}',
        value: Math.PI * Math.log(2)
    }*/
]

export const defaultEqsOptions = defaultEqs.map((eq, index) => {
    return {
        label: eq.eq,
        value: index + ''
    }
})