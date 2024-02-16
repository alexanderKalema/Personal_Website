import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

class ProjectDetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCaseStudyModal: false,
            currentPage:  0,
        };
    }

    render() {
        const { showCaseStudyModal } = this.state;
        const { data } = this.props;
        const technologies = data?.technologies;
        const images = data?.images;
        const title = data?.title;
        const description = data?.description;
        const url = data?.url;

        const AutoplaySlider = withAutoplay(AwesomeSlider);

        const tech = technologies?.map((icon, i) => (
            <li className="list-inline-item mx-3 mt-1" key={i}>
                <span>
                    <div className="text-center">
                        <i className={icon.class} style={{ fontSize: "400%" }}>
                            <p className="text-center" style={{ fontSize: "50%" }}>
                                {icon.name}
                            </p>
                        </i>
                    </div>
                </span>
            </li>
        ));

        const img = images?.map((elem, i) => <div key={i} data-src={elem} />);

        return (
            <>
                <Modal
                    {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modal-inside custom-modal"
                >
                    <span onClick={this.props.onHide} className="modal-close">
                        <i className="fas fa-times fa-2x close-icon"></i>
                    </span>
                    <div className="d-flex px-5">
                        <div className="d-flex flex-column justify-content-center w-25 mr-2">
                            <h3 className="mb-5 text-xl-center" style={{fontSize:"2.1rem"}}>
                                {title}
                                {url && (
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-href"
                                    >
                                        <i
                                            className="fas fa-external-link-alt"
                                            style={{ marginLeft: "10px" }}
                                        ></i>
                                    </a>
                                )}
                            </h3>
                            <p className="mb-4" style={{fontSize:"1.7rem"}}>{description}</p>
                            <Button
                                onClick={this.toggleCaseStudyModal}
                                className="btn btn-primary mb-3"
                                style={{fontSize:"1.5rem"}}
                            >
                                Case Study
                            </Button>
                            <ul className="list-inline mx-auto">{tech}</ul>
                        </div>
                        <div className="w-75 ml-3">
                            <AutoplaySlider
                                cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
                                animation="scaleOutAnimation"
                                className="slider-image"
                                play={true}
                                cancelOnInteraction={true}
                                interval={3000}
                            >
                                {img}
                            </AutoplaySlider>
                        </div>
                    </div>
                </Modal>
                <Modal
                    show={showCaseStudyModal}
                    onHide={this.toggleCaseStudyModal}
                    size="lg"
                    centered
                    style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}
                >
                    <Modal.Header closeButton style={{ borderBottom: '1px solid #ddd' }}>
                        <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>Case Study</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '20px', lineHeight: '1.6' }}>{this.renderCaseStudyPages()}</Modal.Body>
                    <Modal.Footer style={{ borderTop: '1px solid #ddd', justifyContent: 'center' }}>
                        <Button
                            variant="secondary"
                            onClick={() => this.handlePageChange(-1)}
                            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <FaArrowLeft style={{ color: '#fff' }} />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => this.handlePageChange(1)}
                            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}
                        >
                            <FaArrowRight style={{ color: '#fff' }} />
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    renderCaseStudyPages = () => {
        const { data } = this.props;
        const caseStudy = data?.caseStudy;
        const { currentPage } = this.state;

        if (!caseStudy) return null;

        const paragraphsPerPage =  1;
        const start = currentPage * paragraphsPerPage;
        const end = start + paragraphsPerPage;

        return caseStudy
            .slice(start, end)
            .map((paragraph, index) => (
                <p
                    key={index}
                    style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "18px",
                        lineHeight: "1.6",
                        margin: "20px  0",
                        color: "#333",
                    }}
                >
                    {paragraph.split('\n').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            ));
    };

    toggleCaseStudyModal = () => {
        this.setState((prevState) => ({
            showCaseStudyModal: !prevState.showCaseStudyModal,
            currentPage: 0,
        }));
    };

    handlePageChange = (delta) => {
        this.setState((prevState) => ({
            currentPage: Math.max(
                0,
                Math.min(
                    prevState.currentPage + delta,
                    this.props.data?.caseStudy.length - 1
                )
            ),
        }));
    };
}

export default ProjectDetailsModal;
