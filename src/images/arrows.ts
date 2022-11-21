const arrows_list: {[key: string]: string} = {
    default: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"><path d="M9.914,0L245,150.772L480.086,0L245,490L9.914,0z"/></svg>',
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
