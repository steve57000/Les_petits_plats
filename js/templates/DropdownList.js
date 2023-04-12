class DropdownList {
    constructor(listItems, container) {
        this._listItems = listItems
        this._container = container
        this.$listenerbuttonList = document.querySelectorAll('.button-dropdown-menu')
    }

    dropdownListShow() {
        this.$listenerbuttonList.forEach(listenerElement => {
            listenerElement.addEventListener('click', (handleBtnClick))
        })
    }

    createDropdownList() {
        const elementList = document.createElement('li')

        elementList.setAttribute('value', this._listItems)
        elementList.innerHTML = this._listItems
        addMultiplesAttributs(elementList, {
            'class': 'select-items',
            'tabindex': '0',
            'aria-label': 'trier recettes par ' + this._listItems,
            'data-list': this._container.id,
        })
        this.dropdownListShow()
        return elementList
    }
}
