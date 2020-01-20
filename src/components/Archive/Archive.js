import React, { Component } from 'react';
import ProxyService from '../../services/proxy-api-service';

/**
 * Required props:
 * node
 * //editNodeArchive(archive_url, archive_date)
 */
export class Archive extends Component {
  constructor(props) {
    super(props);
    const favoredArchive = props.node ? props.node.archive_url : null;
    this.state = {
      archives: [],
      favoredArchive,
      waybackOk: null,
      waybackUrl: null,
      showAll: false,
      mementoStatus: null
    };
  }

  getWayback = async () => {
    const url = this.props.node.url;
    // const prepped = encodeURIComponent(url.split('://')[1]);
    // const res = await fetch(
    //   `http://archive.org/wayback/available?url=${prepped}`
    // );

    const availResponse = await ProxyService.getWayback(url);
    console.log(availResponse);
    const newestSnapshot = availResponse.archived_snapshots.closest;
    if (!newestSnapshot) {
      this.setState({ waybackOk: false });
    } else {
      this.setState({ waybackOk: true, waybackUrl: newestSnapshot.url });
    }
  };

  getArchiveList = async () => {
    let url = this.props.node.url;
    // if (url.includes('?')) {
    //   //need to partially URI encode
    //   const parts = url.split('?');
    //   parts[1] = encodeURIComponent(parts[1]);
    //   url = parts.join('%3f');
    // }
    // try {
    //   const res = await fetch(
    //     `http://timetravel.mementoweb.org/prediction/json/${url}`
    //   );
    //   const mementoInfo = res.json().memento_info;
    const memento = await ProxyService.getMemento(url);
    console.log(memento);
    const archives = memento.memento_info.map(service => service.timegate_uri);
    this.setState({ archives, mementoStatus: true });
  };

  componentDidMount() {
    this.getWayback();
  }

  displayArchive = url => {
    const host = url.split('/')[2];
    return (
      <li key={url}>
        <a href={url}>{host}</a>
      </li>
    );
  };

  renderWayback() {
    if (this.state.waybackOk === null) {
      return <div>Checking the Internet Archive...</div>;
    } else if (this.state.waybackOk) {
      return (
        <div>
          Visit{' '}
          <a href={this.state.waybackUrl}>archive on the Wayback Machine</a>
        </div>
      );
    } else {
      return <div>The Wayback Machine doesn't have this archived.</div>;
    }
  }

  renderAll() {
    if (this.state.mementoStatus === null) {
      return <div>Checking the Memento Project...</div>;
    }
    if (this.state.mementoStatus) {
      if (this.state.archives.length === 0) {
        return <div>Unable to find any archives of this URL</div>;
      }
      return <ul>{this.state.archives.map(this.displayArchive)}</ul>;
    }
    return <div>An error occurred when checking for other archives.</div>;
  }

  checkArchives = () => {
    this.setState({ showAll: true });
    this.getArchiveList();
  };

  render() {
    if (this.state.showAll) {
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              this.setState({ showAll: false });
            }}
          >
            Hide archive list
          </button>
          {this.renderAll()}
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" onClick={this.checkArchives}>
            Check other archives
          </button>
          {this.renderWayback()}
        </div>
      );
    }
  }
}

export default Archive;
