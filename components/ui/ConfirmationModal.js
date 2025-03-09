import classes from "./ConfirmationModal.module.css";

function ConfirmationModal(props) {
  return (
    <div className={classes.backdrop} onClick={props.onCancel}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <p>{props.message}</p>
        <div className={classes.actions}>
          <button onClick={props.onConfirm}>Yes</button>
          <button onClick={props.onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
