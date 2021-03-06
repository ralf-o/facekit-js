'use strict';

import Component from '../base/Component';
import PaginationHelper from '../helpers/PaginationHelper';

const view = (html, data, ctx) => (props, children) => {
    const metrics = PaginationHelper.calcPaginationMetrics(
            props.get('pageIndex'),
            props.get('pageSize'),
            props.get('totalItemCount'));

    return (
        html.div({className: 'fk-pagination-info'},
            props.get('type') !== 'infoAboutItems'
                   ? getPageInfo(metrics)
                   : getItemsInfo(metrics))
    );
};

function getPageInfo(metrics) {
   return 'Page ' + (metrics.pageIndex + 1) + (metrics.pageCount >= 0 ? ' of ' + metrics.pageCount : '');
}

function getItemsInfo(metrics) {
    const firstItemIndex = metrics.pageIndex !== -1 && metrics.pageCount !== -1
                ? metrics.pageIndex * metrics.pageSize
                : -1,
          lastItemIndex = firstItemIndex !== -1 && metrics.totalItemCount !== -1
                ? Math.min(metrics.totalItemCount - 1, firstItemIndex + metrics.pageSize - 1)
                : -1;

    return (firstItemIndex + 1) + ' - ' + (lastItemIndex + 1) + ' of ' + metrics.totalItemCount;
}


const defaultProps = {
    type: 'infoAboutPage',
    pageIndex: -1,
    pageSize: -1,
    totalItemCount: -1
};

const propTypes = {
    type: React.PropTypes.oneOf(['infoAboutPage', 'infoAboutItems']),
    pageIndex: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    totalItemCount: React.PropTypes.number
};

export const PaginationInfo = Component.createClass({
    typeName: 'facekit/PaginationInfo',
    view: view,
    defaultProps: defaultProps
});

export default PaginationInfo;
export const paginationInfo = PaginationInfo.createElement;