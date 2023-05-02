import { useCallback, useEffect, useState } from 'react'

/**
 * because we want to make the request imediatly
 * @param {*} func 
 * @param {*} dependencies 
 * @returns 
 */
export const useAysnc = function (func, dependencies = []) {
	const { execute, ...states } = useAsyncInternal(func, dependencies)

	useEffect(function () {
		execute()
	}, [])

	return states
}
export const useAysncFn = function (func, dependencies = []) {
	// TODO
	return useAsyncInternal(func, dependencies, false)
}
/**
 * to manage state while making resquest easily
 * @param {Function} func 
 * @param {Array} dependencies the parameters of the func function
 * @param {boolean} initialState 
 * @returns 
 */
function useAsyncInternal(func, dependencies, initialState = false) {
	const [Error, setError] = useState("")
	const [value, setvalue] = useState()
	const [loading, setloading] = useState(false)

	/* const execute = useCallback((...params) => {
		try {

			(async function () {
				// console.log("first")
				setloading(true)
				console.log("params : ", params)
				const data = await func(...params)
				console.log("data asyncFN : ", data)

				if (typeof data == "string" || (data?.message && !data?.id)) {
					setvalue(undefined)
					setError(data?.message || data)
				} else {
					setvalue(data)
					setError(undefined)
				}
			})()

		} catch (err) {

			console.log("error : ", err);
			setError(err)
			setvalue(undefined)

		} finally {
			setloading(false)
		}

	}, [...dependencies]) */

	const execute = useCallback((...params) => {

		setloading(true)
		console.log("params : ", params)
		return func(...params).then(data => {
			console.log("data asyncFN : ", data)
			if (typeof data == "string" || (data?.message && !data?.id)) {
				setvalue(undefined)
				setError(data?.message || data)
			} else {
				setvalue(data)
				setError(undefined)
			}
			return data
		}).catch(err => {
			console.log("error : ", err);
			setError(err)
			setvalue(undefined)
			return Promise.reject(err)

		}).finally(() => {
			setloading(false)
		})

	}, [...dependencies])

	return { error: Error, loading, value, execute }

}

export default useAsyncInternal