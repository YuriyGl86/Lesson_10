const linkList = Array.from(document.querySelectorAll('a.has-tooltip'))
linkList.forEach(a => {
    addTooltip(a)
})



function addTooltip (a){
    const text = a.title
    const tooltip = document.createElement('div')
    tooltip.innerText = text
    
    tooltip.classList.toggle('tooltip')
    console.log(tooltip.style)
    tooltip.style.left = a.offsetLeft + 'px'
    
    a.insertAdjacentElement('afterend', tooltip)
    a.addEventListener('click', (event)=>{
        event.preventDefault()
        const currentActive = document.querySelector('.tooltip_active')
        const currentTooltip = event.target.nextElementSibling
        if(currentActive){currentActive.classList.toggle('tooltip_active')}
        if (currentActive != currentTooltip) {currentTooltip.classList.toggle('tooltip_active')}
    })
}