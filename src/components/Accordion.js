import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import AccordionSection from './AccordionSection';

const AccordionWrapper = styled.div`
`

class Accordion extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
    };

    constructor(props) {
        super(props);

        const openSections = {};

        this.state = { openSections };
    }

    onClick = label => {
        const {
            state: { openSections },
        } = this;

        const isOpen = !!openSections[label];

        this.setState({
            openSections: {
                [label]: !isOpen
            }
        });
    };

    render() {
        const {
            onClick,
            props: { children },
            state: { openSections },
        } = this;

        return (
            <AccordionWrapper>
                {children.map(child => (
                    <AccordionSection
                        isOpen={!!openSections[child.props.label]}
                        label={child.props.label}
                        onClick={onClick}
                    >
                        {child.props.children}
                    </AccordionSection>
                ))}
            </AccordionWrapper>
        );
    }
}

export default Accordion;
