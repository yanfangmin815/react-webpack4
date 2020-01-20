import Loadable from 'react-loadable'

const components = (path) => Loadable({
    loader:() => import(`@/component/${path}`),
    loading:() => (null)
});

// Export Components
const SubHeader = components('subHeader/subHeader.jsx');
const Loading = components('loading/loading.js');
const RouterGuard = components('router-guard/router-guard.js');
const RouterGuardMulti = components('router-guard-multi/router-guard-multi.js');
const Commutation = components('commutation/commutation.jsx');


export {
    SubHeader,
    Loading,
    RouterGuard,
    RouterGuardMulti,
    Commutation
}
