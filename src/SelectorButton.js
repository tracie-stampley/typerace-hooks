const SelectorButton = ({buttonNames, onClick, selectionType}) => {

    switch(selectionType) {
        case "Film Title":
            return buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => onClick(buttonName.title)}>{buttonName.title}</button>);
        case "Description":
            return buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => onClick(buttonName.description)}>{buttonName.description}</button>);
        case "Director":
            return buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => onClick(buttonName.director)}>{buttonName.director}</button>);
        default:
            return buttonNames.map(buttonName => <button key={buttonName.id} onClick={() => onClick(buttonName.title)}>{buttonName.title}</button>);
        };
    };

export default SelectorButton;