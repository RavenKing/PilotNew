 import interact from "interact.js";
 import $ from "jquery";
 
  let dragMoveListener = function(event) {
    let target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform =
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  export function setNodeDragable(ele){

    let interactable = interact(ele);
    interactable.draggable({
      onmove: dragMoveListener,
      onend: function(event) {
        
        event.target.style.webkitTransform =
          event.target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
        event.target.setAttribute('data-x', 0);
        event.target.setAttribute('data-y', 0);      

      }
    });
    return interactable;
  };

  export function resetPosition(ele) {
    ele.style.webkitTransform =
      ele.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
    ele.setAttribute('data-x', 0);
    ele.setAttribute('data-y', 0);
  };

  export function setCardDragable(ele) {
    let interactable = interact(ele);
    interactable.draggable({
      snap: {
        targets: [
          interact.createSnapGrid({ x: 20, y: 20 })
        ],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      },
      restrict: {
        restriction: "#content",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      onmove: dragMoveListener 

    });
    return interactable;
  };

  export function setAreaDropable(option) {
    let interactable = interact(option.element);
    interactable.dropzone({
      accept: option.accept, // seems no effect
      overlap: 0.1,
      ondropactivate: option.ondropactivate || function(event) {},
      ondragenter: option.ondragenter || function(event) {
        event.target.classList.add('drop-target');
      },
      ondragleave: option.ondragleave || function(event) {
        event.target.classList.remove('drop-target');
      },
      ondrop: option.ondrop || function(event) {
        event.target.classList.remove('drop-target');
      },
      ondropdeactivate: option.ondropdeactivate || function(event) {
        event.target.classList.remove('drop-target');
      }
    });
    return interactable;
  };
  export function handleFocus(ele) {
    $(ele).click(function() {
      $(ele).css("zIndex",2);
      $(ele).siblings().css("zIndex", 0);
    });
  };
 


