import _ from "lodash";

export const getURLParams = (payload: object | void): string => {
    const params = payload && _.omitBy(payload, _.isNil)
    return params ? `?${new URLSearchParams(params).toString()}` : '';
}
  