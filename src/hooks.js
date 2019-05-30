/**
 * For using ref's on components or DOM elements,
 * like old `ref` usage.
 *
 * returns an array of:
 * - the element (`ref.current`) updated after first render
 * - the ref itself (so it can be given to the element)
 */
const useElementRef = () => {
  const ref = useRef();
  const [element, setElement] = useState();
  useEffect(() => {
    // useEffect is post render, so the ref will be set by now
    setElement(ref.current);
  }, []); // it's an ElementRef so we should be ok to set it once?
  return [element, ref]; // no need to return setElement
};
