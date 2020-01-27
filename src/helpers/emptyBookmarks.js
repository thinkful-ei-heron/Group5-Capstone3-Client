import uuid from 'uuid';

const emptyBookmarks = [
  {
    id: uuid(),
    type: 'folder',
    title: 'Bookmarks Toolbar',
    add_date: '1527747292',
    last_modified: '1578350197',
    ns_root: 'toolbar',
    contents: [],
  },
  {
    id: uuid(),
    title: 'Menu',
    ns_root: 'menu',
    contents: [],
  },
  {
    id: uuid(),
    type: 'folder',
    title: 'Other Bookmarks',
    add_date: '1529395498',
    last_modified: '1578328430',
    ns_root: 'unsorted',
    contents: [],
  },
];

export default emptyBookmarks;
