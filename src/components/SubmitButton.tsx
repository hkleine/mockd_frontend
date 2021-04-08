import { PrimaryButton } from "./PrimaryButton";

export const SubmitButton = (props: any) => {
  if (props.isValid) {
    return <PrimaryButton disabled={!props.isValid} onClick={props.isValid ? props.onClick : null} type="submit">{props.children}</PrimaryButton>;
  }
  return <button className="bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-10 rounded shadow" disabled type="submit">{props.children}</button>;
};