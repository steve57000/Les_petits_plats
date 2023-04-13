class ListItemSelect{
    constructor(itemSelect) {
        this._itemSelect = itemSelect
        this.typeListFilter = this._itemSelect.getAttribute('data-list')
        this.domIdFirstStr = '#selected-'
        this.containerId = this.domIdFirstStr.concat(this.typeListFilter)
        this.$wrapperTag = document.querySelector(this.containerId)
    }

    createTagItem(){

        const containerTag = document.createElement('div')
        containerTag.className = 'container-tag'
        switch(this.typeListFilter) {
            case 'list-ingredient':
                containerTag.classList.add('bg-blue')
                break
            case 'list-appliance':
                containerTag.classList.add('bg-green')
                break
            case 'list-ustensil':
                containerTag.classList.add('bg-red')
                break
            default:
                break
        }

        const elementTagName = document.createElement('span')
        elementTagName.className = 'tag'
        elementTagName.value = this._itemSelect.getAttribute('value')
        elementTagName.innerHTML = this._itemSelect.getAttribute('value')
        elementTagName.setAttribute('data-type', this.typeListFilter)
        elementTagName.setAttribute('data-list', this.containerId)

        const buttonRemoveTag = document.createElement('span')
        buttonRemoveTag.setAttribute('role', 'button')
        buttonRemoveTag.className = 'button-remove'
        buttonRemoveTag.style.backgroundImage = "url('./assets/icons/circle-xmark-regular.svg')"

        containerTag.appendChild(elementTagName)
        containerTag.appendChild(buttonRemoveTag)
        this.$wrapperTag.appendChild(containerTag)
    }

    render(){
        this.createTagItem()
    }
}
