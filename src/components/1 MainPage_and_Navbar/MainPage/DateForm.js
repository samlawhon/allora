import React, {Fragment} from 'react';
import DayPicker from 'react-day-picker';
import './DateForm.css';
import 'react-day-picker/lib/style.css';

const DateForm = props => {

    const from = props.from;
    const to = props.to;
    const modifiers = { start: props.from, end: props.to };
    
    return (
        <Fragment>
            <label id="day-picker"><h3 className="font-weight-bold main-sub-header">When?</h3></label>
            <DayPicker numberOfMonths={2} id="day-picker" className="Selectable" modifiers={modifiers} selectedDays={ [from, { from, to }]} onDayClick={props.handleDayClick}/>
        </Fragment>
    );
}

export default DateForm;