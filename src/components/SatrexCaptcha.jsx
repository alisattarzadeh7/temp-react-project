import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItems = () => {
  let word = [
    { id: '1', content: 'S' },
    { id: '2', content: 'A' },
    { id: '3', content: 'T' },
    { id: '4', content: 'R' },
    { id: '5', content: 'E' },
    { id: '6', content: 'X' },
  ];
  let count = 0;
  do {
    count = 0;
    word = word.sort(() => 0.5 - Math.random());

    word.map((item, index) => {
      if (index + 1 === parseInt(item.id)) count += 1;
      return index + 1 === parseInt(item.id);
    });
  } while (count === 3);
  return word;
};
// a little function to help us with reordering the result

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  height: '38px',
  width: 30,
  margin: `0 ${grid}px 0 0`,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  display: 'flex',
  padding: grid,
  overflow: 'hidden',
});

class SatrexCaptcha extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ordered: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  orderCheck() {
    document.querySelectorAll('.supportInput').forEach((item) => item.blur());
    let count = 0;
    this.state.items.map((item, index) => {
      if (index + 1 === parseInt(item.id)) count += 1;
      return index + 1 === parseInt(item.id);
    });

    if (count === 6) {
      this.props.captcha(() => true);
      return true;
    }
    this.props.captcha(() => false);
    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.shuffle !== this.props.shuffle) {
      this.setState({
        items: getItems(),
        ordered: false,
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) this.setState({ items: getItems() });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              className="captchaBackground"
              dir="ltr"
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      className="orderBoxListItem"
                    >
                      <div
                        className="orderBoxText"
                        style={
                          this.orderCheck()
                            ? { color: '#04DAD8' }
                            : { color: 'red' }
                        }
                      >
                        {item.content}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default SatrexCaptcha;
