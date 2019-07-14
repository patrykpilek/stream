import React from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux'
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
        this.hls = new Hls({ enableWorker: false });
    }


    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        if (this.hls) {
            this.hls.destroy();
        }
    }

    buildPlayer() {
        if(this.hls || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;

        this.hls.loadSource(`http://209.97.135.176:8080/hls/${id}.m3u8`);
        this.hls.attachMedia(this.videoRef.current);
        this.hls.on(Hls.Events.MANIFEST_PARSED,function() {
            this.videoRef.current.play();
        });
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);