import licenses from "virtual:oss-licenses";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${licenses.name}
`