type Construct = 
{
    id: string,
    rolls: number[] | string[],
    colors?: string[],
    duration?: number,
    arrow?: { element?: string | HTMLElement, width?: number, fill?: string },
    landing?: 'precise' | 'loose',
    diameter?: number,
    shrink?: number,
};

export type Standard = Construct & {
    type?: 'standard',
}

export type Doughnut = Construct & {
    type: 'doughnut',
    doughnut: { diameter: number, fill?: string},
}

export type Custom = Construct & {
    type: 'image',
    image: { src: string, angle?: number },
}
