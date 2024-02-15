import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

class ProjectDetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCaseStudyModal: false,
            currentPage: 0,
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
            <li className="list-inline-item mx-3" key={i}>
        <span>
          <div className="text-center">
            <i className={icon.class} style={{ fontSize: "300%" }}>
              <p className="text-center" style={{ fontSize: "30%" }}>
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
                    <div className="row">
                        <div className="col-md-8">
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
                        <div className="col-md-4 d-flex flex-column justify-content-center" style={{padding: "75px 75px 0 15px" }}>
                            <h3 style={{ padding: "15px 15px 0 15px" }}>
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
                            <p className="modal-description">{description}</p>
                            <div className="text-center mt-auto" style={{marginBottom: "20px"}}>
                                <Button onClick={this.toggleCaseStudyModal}>Case Study</Button>
                            </div>
                            <div className="col-md-12 text-center">
                                <ul className="list-inline mx-auto">{tech}</ul>
                            </div>

                        </div>
                    </div>
                </Modal>
                <Modal
                    show={showCaseStudyModal}
                    onHide={this.toggleCaseStudyModal}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Case Study</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.renderCaseStudyPages()}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => this.handlePageChange(-1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => this.handlePageChange(1)}
                        >
                            Next
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

        const paragraphsPerPage = 1;
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
                        margin: "20px 0",
                        color: "#333",
                    }}
                >
                    {paragraph}
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
