import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import './DateForm.css';
import 'react-day-picker/lib/style.css';

class DateForm extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            from: undefined,
            to: undefined
        };
    }

    handleDayClick(day){
        const range = DateUtils.addDayToRange(day, this.state);
        console.log(range);
        this.setState(range);
    }

    render() {
        const {from, to} = this.state;
        const modifiers = { start: this.state.from, end: this.state.to };
        return (
            <div>
                <h3 className="font-weight-bold main-sub-header">When?</h3>
                <DayPicker numberOfMonths="2" className="Selectable" modifiers={modifiers} selectedDays={ [from, { from, to }]} onDayClick={this.handleDayClick}/>
            </div>
        );
    }
}

export default DateForm