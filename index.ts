/**
 *
 * @param str
 * @returns object
 */
export const getQueryParams = (str?: string): any => {
  if (!window.location.search.length) return {};

  const search = str ? str : window.location.search.slice(1);
  return search
    .split("&")
    .map((param) => param.split("="))
    .reduce((prev, [key, value]) => {
      key = key.replace("[]", "");

      if (value === "") {
        return prev;
      }
      // transform number
      const val = !isNaN(Number(value))
        ? Number(value)
        : value === "true"
        ? true
        : value === "false"
        ? false
        : value;
      if (prev?.[key] !== undefined) {
        Array.isArray(prev[key])
          ? prev[key].push(val)
          : (prev[key] = [prev[key], val]);
      } else {
        prev[key] = val;
      }

      return prev;
    }, {} as any);
};

export const setQueryParams = (params: object, withOutOld?: boolean): void => {
  const oldParams = getQueryParams();
  const search = getQueryParamsFromObject({
    ...(withOutOld ? {} : oldParams),
    ...params,
  });
  const refresh = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${search}`;
  window.history.pushState({ path: refresh }, "", refresh);
};

export const getQueryParamsFromObject = (params: object) => {
  const search = Object.entries(params)
    .map((param) => {
      if (param.includes(undefined)) {
        return null;
      }
      //
      if (Array.isArray(param[1])) {
        return param[1]
          .map((value) => {
            return `${param[0]}=${value}`;
          })
          .join("&");
      }
      return param.join("=");
    })
    .filter((param) => {
      return param !== null;
    })
    .join("&");
  return search;
};