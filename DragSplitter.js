class DragSplitter {
  /**
   *
   * HTML ELEMENT 순서
   * <div></div> - 버튼 이전 컨텐츠
   * <button></button> - 드래그 할 아이디 (x, y 동일)
   * <div></div> - 버튼 이후 컨텐츠
   *
   */

  /**
   *
   * @param {any} resizerId - getElementById
   * @param {any} direction - 움직일 방향 x 또는 y
   */
  constructor(resizerId, direction) {
    this.resizer = document.getElementById(resizerId);
    this.leftSide = this.resizer.previousElementSibling; // 버튼 이전 컨텐츠 엘리먼트
    this.rightSide = this.resizer.nextElementSibling; // 버튼 이후 컨텐츠 엘리먼트
    this.direction = direction; // x 또는 y
    this.dimension = direction === 'x' ? 'width' : 'height';

    this.offset = 0;
    this.leftDimension = 0;

    this.mouseDownHandler = this.mouseDownHandler;
    this.mouseMoveHandler = this.mouseMoveHandler;
    this.mouseUpHandler = this.mouseUpHandler;

    this.resizer.addEventListener('mousedown', this.mouseDownHandler);
  }

  //화살표(arrow) 함수를 사용하면 자체 클래스를 가르키기 때문에 this를 bind하지 않아도 된다.
  mouseDownHandler = (e) => {
    this.offset = this.direction === 'x' ? e.clientX : e.clientY;
    this.leftDimension = this.leftSide.getBoundingClientRect()[this.dimension]; // width인지 height인지 배열 문자열로 객체의 키 값을 가져옴

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  };

  mouseMoveHandler = (e) => {
    let diff;
    let newLeftDimension;

    switch (
      this.direction // x, y값에따라 다른 이벤트
    ) {
      case 'y':
        diff = e.clientY - this.offset;
        newLeftDimension = ((this.leftDimension + diff) * 100) / this.resizer.parentNode.getBoundingClientRect()[this.dimension];
        this.leftSide.style[this.dimension] = `${newLeftDimension}%`;
        this.rightSide.style[this.dimension] = `${100 - newLeftDimension}%`;
        break;
      case 'x':
      default:
        diff = e.clientX - this.offset;
        newLeftDimension = ((this.leftDimension + diff) * 100) / this.resizer.parentNode.getBoundingClientRect()[this.dimension];
        this.leftSide.style[this.dimension] = `${newLeftDimension}%`;
        this.rightSide.style[this.dimension] = `${100 - newLeftDimension}%`;
        break;
    }

    //style 추가
    document.body.style.cursor = `${this.direction}-resize`;
    this.leftSide.style.userSelect = 'none';
    this.leftSide.style.pointerEvents = 'none';
    this.rightSide.style.userSelect = 'none';
    this.rightSide.style.pointerEvents = 'none';
  };

  mouseUpHandler = () => {
    //style 삭제
    this.resizer.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');
    this.leftSide.style.removeProperty('user-select');
    this.leftSide.style.removeProperty('pointer-events');
    this.rightSide.style.removeProperty('user-select');
    this.rightSide.style.removeProperty('pointer-events');

    // 이벤트 제거
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  };
}

// x 드래그 상속
class DragSplitterX extends DragSplitter {
  constructor(resizerId) {
    super(resizerId, 'x');
  }
}

// y 드래그 상속
class DragSplitterY extends DragSplitter {
  constructor(resizerId) {
    super(resizerId, 'y');
  }
}

const xSplitter = new DragSplitterX('dragLine');
const leftSplitter = new DragSplitterY('leftContDragBtn');
//const rightSplitter = new DragSplitterY('rightContDragBtn');

// 이전 X, Y 클래스

//class dragSplitter {

//}

//class dragSplitterX {
//    constructor(resizerId) {
//        this.resizer = document.getElementById(resizerId);
//        this.leftSide = this.resizer.previousElementSibling;
//        this.rightSide = this.resizer.nextElementSibling;

//        this.x = 0;
//        this.leftWidth = 0;

//        this.mouseDownHandler = this.mouseDownHandler.bind(this);
//        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
//        this.mouseUpHandler = this.mouseUpHandler.bind(this);

//        this.resizer.addEventListener('mousedown', this.mouseDownHandler);
//    }

//    mouseDownHandler(e) {
//        this.x = e.clientX;
//        this.leftWidth = this.leftSide.getBoundingClientRect().width;

//        document.addEventListener('mousemove', this.mouseMoveHandler);
//        document.addEventListener('mouseup', this.mouseUpHandler);
//    }

//    mouseMoveHandler(e) {
//        const dx = e.clientX - this.x;
//        const newLeftWidth = ((this.leftWidth + dx) * 100) / this.resizer.parentNode.getBoundingClientRect().width;
//        this.leftSide.style.width = `${newLeftWidth}%`;

//        document.body.style.cursor = 'col-resize';
//        this.leftSide.style.userSelect = 'none';
//        this.leftSide.style.pointerEvents = 'none';
//        this.rightSide.style.userSelect = 'none';
//        this.rightSide.style.pointerEvents = 'none';

//        console.log("leftWidth", this.leftWidth);
//        console.log("dx", dx);
//        console.log("newLeftWidth", newLeftWidth);
//    }

//    mouseUpHandler() {

//        this.resizer.style.removeProperty('cursor');
//        document.body.style.removeProperty('cursor');
//        this.leftSide.style.removeProperty('user-select');
//        this.leftSide.style.removeProperty('pointer-events');
//        this.rightSide.style.removeProperty('user-select');
//        this.rightSide.style.removeProperty('pointer-events');

//        document.removeEventListener('mousemove', this.mouseMoveHandler);
//        document.removeEventListener('mouseup', this.mouseUpHandler);
//    }
//}

//const xSplitter = new dragSplitterX('dragLine');

//class dragSplitterY {
//    constructor(resizerId) {
//        this.resizer = document.getElementById(resizerId);
//        this.leftSide = this.resizer.previousElementSibling;
//        this.rightSide = this.resizer.nextElementSibling;

//        this.y = 0;
//        this.topHeight = 0;

//        this.mouseDownHandler = this.mouseDownHandler.bind(this);
//        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
//        this.mouseUpHandler = this.mouseUpHandler.bind(this);

//        this.resizer.addEventListener('mousedown', this.mouseDownHandler);
//    }

//    mouseDownHandler(e) {
//        this.y = e.clientY;
//        this.topHeight = this.leftSide.getBoundingClientRect().height;

//        document.addEventListener('mousemove', this.mouseMoveHandler);
//        document.addEventListener('mouseup', this.mouseUpHandler);
//    }

//    mouseMoveHandler(e) {
//        const dy = e.clientY - this.y;
//        const newTopHeight = ((this.topHeight + dy) * 100) / this.resizer.parentNode.getBoundingClientRect().height;
//        this.leftSide.style.height = `${newTopHeight}%`;

//        document.body.style.cursor = 'row-resize';
//        this.leftSide.style.userSelect = 'none';
//        this.leftSide.style.pointerEvents = 'none';
//        this.rightSide.style.userSelect = 'none';
//        this.rightSide.style.pointerEvents = 'none';

//        console.log("topHeight", this.topHeight);
//        console.log("dy", dy);
//        console.log("newTopHeight", newTopHeight);
//    }

//    mouseUpHandler() {

//        this.resizer.style.removeProperty('cursor');
//        document.body.style.removeProperty('cursor');
//        this.leftSide.style.removeProperty('user-select');
//        this.leftSide.style.removeProperty('pointer-events');
//        this.rightSide.style.removeProperty('user-select');
//        this.rightSide.style.removeProperty('pointer-events');

//        document.removeEventListener('mousemove', this.mouseMoveHandler);
//        document.removeEventListener('mouseup', this.mouseUpHandler);
//    }
//}

//const leftSplitter = new dragSplitterY('leftContDragBtn');
//const rightSplitter = new dragSplitterY('rightContDragBtn');
