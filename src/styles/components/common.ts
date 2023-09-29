import styled, { css } from "styled-components"



type TTextProps = Partial<{
    display: string,
    width: string | number;
    height: string | number;
    margin: (number | string)[],
    weight: 200 | 300 | 400 | 500 | 600 | 700,
    align: "left" | "center" | "right",
    size: number | string,
    lineHeight: number,
    textTransform: "uppercase" | "lowercase" | "none",
}>;

const cssText = css<TTextProps>`
    display: ${({ display = "inline-flex" }) => display};
    align-items: center;
    justify-content: center;

    width: ${({ width = "" }) => width};
    height: ${({ height = "" }) => height};

    margin: ${({ margin }) => margin ? margin.map(value => typeof (value) === "string" ? value : `${value}px`).join(" ") : ""};

    font-size: ${({ size = null }) => `${size}px`};
    font-weight: ${({ weight = 400 }) => weight};
    line-height: ${({ lineHeight = "" }) => lineHeight};
    text-transform: ${({ textTransform = "" }) => textTransform};
    text-align: ${({ align = "center" }) => align};

`;

const Text = styled.span<TTextProps>`
    ${cssText}
`;

export const Text1 = styled(Text)``;

export const TextSup = styled(Text).attrs<TTextProps>(({
    size = 15,
    weight = 300
}) => ({
    as: "sup",
    size,
    weight
})) <TTextProps>``;


type TTitleProps = TTextProps;

const cssTitle = css<TTitleProps>`
    ${cssText}
`;

const getTitleProps = ({ weight = 700 }): {weight: TTextProps["weight"]} => ({ weight: weight as TTextProps["weight"] });


export const Title1 = styled.h1.attrs<TTitleProps>(({
    size = 48,
    ...restArgs
}) => ({
    as: "h1",
    size,
    ...getTitleProps(restArgs)
})) <TTitleProps>`
    ${cssTitle}
`;

export const Title2 = styled.h2.attrs<TTitleProps>(({
    size = 36,
    ...restArgs
}) => ({
    as: "h2",
    size,
    ...getTitleProps(restArgs)
})) <TTitleProps>`
    ${cssTitle}
`;


type TParagraphProps = TTextProps;

const cssP = css<TParagraphProps>`
    ${cssText}
`;

export const P1 = styled.p.attrs<TParagraphProps>(({
    align: "left"
})) <TParagraphProps>`
    ${cssP}
`;


type TDividerProps = {
    height?: number
    heightMob?: number
};

export const Divider = styled.div<TDividerProps>`
    min-height: ${({ height = 8 }) => `${height}px`}};
`;

type TDividerHProps = {
    width?: number
}

export const DividerH = styled.div<TDividerHProps>`
    width: ${({ width = 8 }) => `${width}px`};
`;



export type TFlexProps = Partial<{
    display: "flex" | "inline-flex",
    direction: React.CSSProperties["flexDirection"],
    justifyContent: React.CSSProperties["justifyContent"],
    alignItems: React.CSSProperties["alignItems"],
    wrap: React.CSSProperties["flexWrap"],
}>;

export const Flex = styled.div<TFlexProps>`
    ${({ display = "flex", ...flexProps }) => css`
        display: ${display};

        flex-direction: ${flexProps.direction ?? ""};
        justify-content: ${flexProps.justifyContent ?? "center"};
        align-items: ${flexProps.alignItems ?? "center"};
        flex-wrap: ${flexProps.wrap ?? ""};
    `}
`;

export const NumWrp = styled.span`
    white-space: nowrap;
`;



export type TMask = {
    image: string
};

export const cssMask = css<TMask>`
    -webkit-mask-size: cover;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-image: url(${({ image }) => image});

    mask-size: cover;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-image: url(${({ image }) => image});
`;

export const Mask = styled.div<TMask>`
    ${cssMask}
`;


type TImage = {
    sWidth: number,
    sHeight: number
};

export const Image = styled.img<TImage>`
    width: ${({ sWidth }) => `${sWidth}px`};
    height: ${({ sHeight }) => `${sHeight}px`};
`;
