import R from "ramda";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorks,
         setEditing,
         setText,
         stateToProps$ } from "../redux/modules/state";
import { Table, Column, Cell } from "fixed-data-table";
import { titleCase } from "change-case";
import "../../node_modules/fixed-data-table/dist/fixed-data-table.css";

class Works extends Component {
  constructor() {
    super();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSave = this.handleTextSave.bind(this);
  }

  componentDidMount() {
    this.props.getWorks();
  }

  handleEditClick({ target }) {
    const [id, key] = target.className.split(" ");
    this.props.setEditing({ [id]: key });
  }

  handleTextChange({ target }) {
    const [id, key] = target.className.split(" ");
    const newObjVals = {
      id,
      [id]: {
        [key]: target.value
      }
    };
    this.props.setText(newObjVals);
  }

  handleTextSave({ target }) {
    this.props.setEditing({});
  }

  render() {
    const entries = Object.values(this.props.works);

    const cellCreator = key => props => {
      const index = props.rowIndex;
      const entry = entries[index];
      const editing = entry.id == this.props.editing[0] &&
        key === this.props.editing[1];

      const entryDetails = `${entries[index]["id"]} ${key}`;

      return (
        <Cell {...props}>
          {editing
            ? <textarea
                className={entryDetails}
                onChange={this.handleTextChange}
                onBlur={this.handleTextSave}
                style={{ width: 150, height: 100 }}
                value={entry[key]}
              />
            : <div
                onDoubleClick={this.handleEditClick}
                className={entryDetails}
                style={{ overflow: "auto" }}
              >
                {entry[key]}
              </div>}

        </Cell>
      );
    };

    const infoCol = (val, key, o) => (
      <Column
        width={key === "description" ? 500 : 200}
        allowCellsRecycling={true}
        key={key + o.id}
        columnKey={key + o.id}
        header={<Cell>{titleCase(key)}</Cell>}
        cell={cellCreator(key)}
      />
    );

    const desc = R.compose(
      R.mapObjIndexed(infoCol),
      R.omit(["geometry", "code", "name"])
    )(entries[0]);

    return (
      <Table
        rowsCount={entries.length}
        rowHeight={130}
        width={window.innerWidth}
        height={window.innerHeight}
        headerHeight={50}
      >
        {Object.values(desc)}
      </Table>
    );
  }
}

const mapDispatchToProps = { getWorks, setEditing, setText };

export default connect(stateToProps$, mapDispatchToProps)(Works);
