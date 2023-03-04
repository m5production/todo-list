export function getElementFromTemplate(templClassName: string) {
  const elem = document.getElementById(templClassName).cloneNode(true);
  if ('content' in elem) {
    return (elem as HTMLTemplateElement).content;
  }
}