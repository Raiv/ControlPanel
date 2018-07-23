import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {endpoints, executeRequest} from "../../../mainActions";
import {UniformGrid} from "../../../../components/basic/formatters/UniformGrid";
import Button from "@material-ui/core/es/Button/Button";
import {EventInput} from "./EventInput"

class AddNewEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventTypes: [],
            values: {},
            selected: "",
            event: {
                type: {},
                operationDateTime: new Date(),
                endDateTime: new Date(),
                startDepthInMeters: "",
                endDepthInMeters: "",
                startMaxWeightKilos: "",
                endMaxWeightKilos: "",
                perespuskInMeters: "",
                place: "",
            }

        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        executeRequest({
            dispatch,
            endpoint: endpoints.EVENT_TYPES_GET_ALL,
            errorMessage: "Failed to fetch event types",
            postprocess: e => this.setState({eventTypes: e})
        })
    }

    addUnit = () => {
        const {dispatch, id} = this.props;
        const {event} = this.state;
        executeRequest({
            dispatch,
            method: "PUT",
            endpoint: `${endpoints.EVENT_UNIT_ADD}/${id}`,
            body: event,
        })
    };

    updateEvent = event => {
        this.setState({event})
    };

    render() {
        const {eventTypes, event} = this.state;
        return <React.Fragment>
            <UniformGrid>
                <EventInput event={event} eventTypes={eventTypes} onChange={this.updateEvent}/>
                <Button onClick={this.addUnit}>Добавить операцию</Button>
            </UniformGrid>
        </React.Fragment>
    }

}

AddNewEvent.propTypes = {
    id: PropTypes.string.isRequired,
};

AddNewEvent.defaultProps = {
    id: ""
};

export default connect()(AddNewEvent)