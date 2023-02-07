// const { Op } = require("sequelize");

// const paginate = async (model, pageSize, pageLimit, funcOptions) => {
//     try {
//         const limit = parseInt(pageLimit, 10) || 10;
//         const page = parseInt(pageSize, 10) || 1;

//         // create an options object
//         let options = {
//             offset: getOffset(page, limit),
//             limit: limit,
//         };

//         // check if the search object is empty
//         if (funcOptions.search && Object.keys(funcOptions.search).length) {
//             options = {options, ...funcOptions.search};
//         }

//         // check if the order array is empty
//         if (funcOptions.order && funcOptions.order.length) {
//             options['order'] = funcOptions.order;
//         }

//         // include
//         if (funcOptions.include && funcOptions.include.length > 0) {
//             options['inlude'] = funcOptions.include;
//         }

//         // take in the model, take in the options
//         let {count, rows} = await model.findAndCountAll({
//             ...options,
//             where: {
//                 AuthorId: 1,
//                 PublishHouseId: 1
//             }           
//         });

//         // check if the transform is a function and is not null
//         if (funcOptions.transform && typeof funcOptions.transform === 'function') {
//            rows = funcOptions.transform(rows);
//         }

//         return {
//             previousPage: getPreviousPage(page),
//             currentPage: page,
//             nextPage: getNextPage(page, limit, count),
//             total: count,
//             limit: limit,
//             data: rows
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getOffset = (page, limit) => {
//  return (page * limit) - limit;
// }

// const getNextPage = (page, limit, total) => {
//     if ((total/limit) > page) {
//         return page + 1;
//     }

//     return null
// }

// const getPreviousPage = (page) => {
//     if (page <= 1) {
//         return null
//     }
//     return page - 1;
// }

// module.exports = { paginate };


const getPreviousPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}

const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        return page + 1;
    }
    return null
}
  
const getOffset = (page, limit) => {
    return (page * limit) - limit;
}

module.exports = {
    getNextPage,
    getPreviousPage,
    getOffset
}