function addMultiplesAttributs(element, attributes) {
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Je récupère la liste cliqué (ingredients, ustensiles ou appareil)
const handleBtnClick = (e) => {
    toggleShow(e.target)
}

// Je récupère l'element cliqué de la fonction handleBtnClick
// Et je cible la list correspondant à l'élément et lui ajoute la class show
const toggleShow = (e) => {
    const dropDownTarget = e.parentNode.parentNode.childNodes[3]
    const container = e.parentNode.parentNode
    const listId =  dropDownTarget.id
    const inputSelected = dropDownTarget.previousElementSibling.childNodes[3]
    const labelSelected = dropDownTarget.previousElementSibling.childNodes[1]

    const elementShow = document.querySelector('.show')
    const elementShowActive = document.querySelector('.show-active')
    const elementInputActive = document.querySelector('.input-active')
    const elementLabelActive = document.querySelector('.label-inactive')

    if(elementShowActive){
        if(elementShow.id !== listId){
            removeShow(elementShow.id, 'show')
            removeShow(elementShowActive.id, 'show-active')
            removeShow(elementInputActive.id, 'input-active')
            removeShow(elementLabelActive.id, 'label-inactive')
        }

    }
    if(listId === 'list-ingredient' ||
        listId ==='list-appliance' ||
        listId ==='list-ustensil'){
        dropDownTarget.classList.toggle('show')
        e.classList.toggle('show-active')
        inputSelected.classList.toggle('input-active')
        labelSelected.classList.toggle('label-inactive')
        container.classList.toggle('showView')
    }
}

const removeShow = (element, className) => {
    const showElement = document.getElementById(element)
    showElement.classList.remove(className)
}

// const mergeSort = array => {
//     // divise le tableau jusqu'à ce qu'il n'y ait qu'un seul élément
//     // condition d'arrêt récursive !
//     if (array.length > 1) {
//         // récupère l'index du milieu de la division courante
//         const middleIndex = Math.floor(array.length / 2)
//         // obtient le côté gauche
//         const leftSide = array.slice(0, middleIndex)
//         // obtient le côté droite
//         const rightSide = array.slice(middleIndex)
//
//         // appel récursif pour la partie gauche des données
//         mergeSort(leftSide)
//         // appel récursif pour la partie droite des données
//         mergeSort(rightSide)
//
//         // configuration par défaut des index
//         let leftIndex = 0, rightIndex = 0, globalIndex = 0
//
//         // boucle jusqu'à atteindre la fin du tableau de gauche ou de droite
//         // on ne peut pas comparer s'il n'y a qu'un seul élément
//         while(leftIndex < leftSide.length && rightIndex < rightSide.length) {
//             // la comparaison de tri réelle est ici
//             // si l'élément de gauche est plus petit, il doit être le premier dans le tableau
//             // sinon le bon élément doit être le premier
//             // déplace les index à chaque pas
//             if (leftSide[leftIndex] < rightSide[rightIndex]) {
//                 array[globalIndex] = leftSide[leftIndex]
//                 leftIndex++
//             } else {
//                 array[globalIndex] = rightSide[rightIndex]
//                 rightIndex++
//             }
//             globalIndex++
//         }
//
//         // s'assurer qu'aucun élément n'a été oublié pendant le processus
//         while(leftIndex < leftSide.length) {
//             array[globalIndex] = leftSide[leftIndex]
//             leftIndex++
//             globalIndex++
//         }
//
//         while(rightIndex < rightSide.length) {
//             array[globalIndex] = rightSide[rightIndex]
//             rightIndex++
//             globalIndex++
//         }
//     }
//     return array
// }
//
// const arrayDoublonClear = array => {
//     return array.reduce((prev, cur) => (prev.indexOf(cur) === -1) ? [...prev, cur] : prev, [])
// }




