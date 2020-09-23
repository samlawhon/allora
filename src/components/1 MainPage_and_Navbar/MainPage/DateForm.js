import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import './DateForm.css';
import 'react-day-picker/lib/style.css';

class DateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: undefined,
            to: undefined
        };
    }

    render() {
        const from = this.props.from;
        const to = this.props.to;
        const modifiers = { start: this.props.from, end: this.props.to };
        return (
            <div>
                <h3 className="font-weight-bold main-sub-header">When?</h3>
                <DayPicker numberOfMonths={2} className="Selectable" modifiers={modifiers} selectedDays={ [from, { from, to }]} onDayClick={this.props.handleDayClick}/>
            </div>
        );
    }
}

export default DateForm