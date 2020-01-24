import React, { Component } from 'react';
import ProxyService from '../../services/proxy-api-service';
import BookmarkContext from '../../contexts/BookmarkContext';
import './Archive.css'

/**
 * Required props:
 * node
 * editNodeArchive: function (archive_url, archive_date) => update the node in the context
 */
export default class Archive extends Component {
  constructor(props) {
    super(props);
    const favoredArchiveUrl = props.node ? props.node.archive_url : null;
    const favoredArchiveDate = props.node ? props.node.archive_date : null;
    this.state = {
      archives: [],
      favoredArchiveUrl,
      favoredArchiveDate,
      waybackOk: null,
      waybackUrl: null,
      showAll: false,
      mementoStatus: null,
      editFavoredArchive: false
    };
  }

  static contextType = BookmarkContext;

  componentDidMount() {
    this.getWayback();
  }

  getWayback = async () => {
    const url = this.props.node.url;
    const availResponse = await ProxyService.getWayback(url);
    const newestSnapshot = availResponse.archived_snapshots.closest;
    if (!newestSnapshot) {
      this.setState({ waybackOk: false });
    } else {
      this.setState({ waybackOk: true, waybackUrl: newestSnapshot.url });
    }
  };

  getArchiveList = async () => {
    let url = this.props.node.url;
    const memento = await ProxyService.getMemento(url);
    const archives = memento.memento_info.map(service => service.timegate_uri);
    this.setState({ archives, mementoStatus: true });
  };

  displayArchive = url => {
    const host = url.split('/')[2];
    return (
      <li className="archiveList" key={url}>
        <a className="archiveLink" href={url} target='_blank' rel='noopener noreferrer'>
          {host}
        </a>
      </li>
    );
  };

  renderWayback() {
    if (this.state.waybackOk === null) {
      return <p>Checking the Internet Archive...</p>;
    } else if (this.state.waybackOk) {
      return (
        <div>
          <a
            className="archiveLink"
            href={this.state.waybackUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit archive on the Wayback Machine
          </a>
        </div>
      );
    } else {
      return <p>The Wayback Machine doesn't have this archived.</p>;
    }
  }

  renderAll() {
    if (this.state.mementoStatus === null) {
      return <p>Checking the Memento Project...</p>;
    }
    if (this.state.mementoStatus) {
      if (this.state.archives.length === 0) {
        return <p>Unable to find any archives of this URL</p>;
      }
      return <ul>{this.state.archives.map(this.displayArchive)}</ul>;
    }
    return <p>An error occurred when checking for other archives.</p>;
  }

  checkArchives = () => {
    this.setState({ showAll: true });
    this.getArchiveList();
  };

  editFavoredArchive = ev => {
    ev.preventDefault();
    const favoredArchiveUrl = document.getElementById('fav-archive-url').value;
    const dateString = document.getElementById('fav-archive-date').value;

    let favoredArchiveDate = null;

    if (dateString) {
      const elements = dateString.split('-');
      favoredArchiveDate = new Date(elements[0], elements[1] - 1, elements[2]);
    }
    this.setState({
      favoredArchiveUrl,
      favoredArchiveDate,
      editFavoredArchive: false
    });
    const update = {
      archive_url: favoredArchiveUrl,
      archive_date: favoredArchiveDate
    };

    this.context.updateNode(this.props.node.id, update);
  };
  favoredArchiveEditor = () => {
    const date = this.state.favoredArchiveDate;
    return (
      <form onSubmit={this.editFavoredArchive}>
        <label htmlFor="fav-archive-url">Archive URL:</label>
        <input
          type="text"
          id="fav-archive-url"
          className="infoInput"
          defaultValue={this.state.favoredArchiveUrl}
          placeholder="https://web.archive.org/web/20000229040250/http://www.google.com/"
        />
        <br />
        <label htmlFor="fav-archive=date">Archive Date:</label>
        <input
          type="date"
          id="fav-archive-date"
          className="infoInput"
          defaultValue={date ? this.formatDate(date) : null}
        />
        <br />
        <button
          type="button"
          className="btn clearBtn"
          onClick={() => document.getElementById('fav-archive-date').value = null}
        >
          Clear Date
        </button>
        <br />
        <button className="btn btnPrimary" type="submit">
          Save
        </button>
      </form>
    );
  };

  formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${
      date.getMonth() >= 9 ? '' : '0'
      }${date.getMonth() + 1}-${
      date.getDate() >= 10 ? '' : '0'
      }${date.getDate()}`;
  }

  renderArchiveManager() {
    const { favoredArchiveUrl, favoredArchiveDate } = this.state;
    return (
      <>
        {!!favoredArchiveUrl
          ? <p>
            You have saved an archive link for this bookmark.{' '}
            <a
              href={favoredArchiveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit this archive{' '}
              {favoredArchiveDate && `(snapshot date: ${this.formatDate(favoredArchiveDate)})`}
            </a>
          </p>
          : <p>You have not saved an archive link for this bookmark.</p>
        }
        {this.state.editFavoredArchive
          ? this.favoredArchiveEditor()
          : <button
            type="button"
            className="btn"
            onClick={() => this.setState({ editFavoredArchive: true })}
          >
            {!!favoredArchiveUrl
              ? 'Edit saved archive link'
              : 'Save an archive link '}
          </button>
        }
      </>
    );
  }

  render() {
    if (this.state.showAll) {
      return (
        <div>
          <button
            type="button"
            className="btn"
            onClick={() => this.setState({ showAll: false })}
          >
            Hide archive list
          </button>
          {this.renderArchiveManager()}
          {this.renderAll()}
        </div>
      );
    }
    return (
      <div>
        <button className="btn" type="button" onClick={this.checkArchives}>
          Check other archives
        </button>
        {this.renderArchiveManager()}
        {this.renderWayback()}
      </div>
    );
  }
}
