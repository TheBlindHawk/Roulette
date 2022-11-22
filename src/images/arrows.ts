const arrows_list: {[key: string]: string} = {
    standard: '<svg viewBox="0 0 490 490"><path d="M9.914,0L480.086,0L245,490L9.914,0z"/></svg>',
    sharp: '<svg viewBox="0 0 490 490"><path d="M9.914,0L245,150.772L480.086,0L245,490L9.914,0z"/></svg>',
};
function arrows(element: string | HTMLElement) {
    return function (): HTMLElement {
        if(element instanceof HTMLElement) { return element; }
        const arrow = arrows_list[element] ? arrows_list[element] : element;
        const template = document.createElement('template');
        template.innerHTML = arrow.trim();
        return template.content.firstChild as HTMLElement;
    }
}
export default arrows;
