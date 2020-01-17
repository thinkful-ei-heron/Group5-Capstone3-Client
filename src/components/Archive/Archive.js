import React, { Component } from 'react';

/**
 * Required props:
 * node
 * editNodeArchive(archive_url, archive_date)
 */
export class Archive extends Component {
  constructor(props) {
    super(props);
    const favoredArchive = props.node ? props.node.archive_url : null;
    this.state = {
      archives: [],
      favoredArchive,
      expanded: false
    };
  }

  getArchives = async () => {};

  render() {
    return <div></div>;
  }
}

export default Archive;
