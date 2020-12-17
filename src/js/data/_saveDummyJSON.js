import getData from './getData';

function saveDummyJSON(url) {
  getData(url).then((obj) => {
    const str = JSON.stringify(obj);
    const blob = new Blob([str], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'dummy.json';
    a.click();
  });
}

export default saveDummyJSON;
