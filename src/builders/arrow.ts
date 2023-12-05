import { ArrowData } from "../utils/construct"
import { getShiftValue, toHTMLArrow } from "../utils/utilities";


export class ArrowBuilder {
    public element: HTMLElement;
    public width: number;
    public height: number;
    public color: string;
    public shift: number;

    constructor(arrow: ArrowData) {
        this.element = toHTMLArrow(arrow.element)
        this.width = arrow.width
        this.height = arrow.height
        this.color = arrow.color
        this.shift = getShiftValue(arrow.shift)
    }

    private drawArrow() {
        this.element.style.maxWidth = `${this.width}px`
        this.element.style.maxHeight = `${this.height}px`
        this.element.style.position = 'absolute'
        this.element.style.backgroundColor = this.color
        this.element.style.transform = `rotate(${this.shift}deg)`
        this.element.style.zIndex = '1'
    }
}