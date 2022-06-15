import InputGroup from "../components/shared/forms/InputGroup";
// import Button from "../components/UI/buttons/Button";
// import TextInput from "../components/UI/inupts/TextInput";
// import Text from "../components/UI/texts/Text";

const App = () => {
    return (
        <div className="root">
            {/* <TextInput placeholder="Please type here" />
            <Button>Test Me</Button>
            <Text size="md" line="lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem iste soluta eveniet blanditiis debitis dicta numquam voluptatibus facere ratione? Unde deserunt eligendi veniam velit, voluptatem qui animi quidem, deleniti hic consectetur vitae harum. Culpa exercitationem iure excepturi minus eius similique ut! Rem, delectus quo? Ea aliquid ut dolor error animi.</Text> */}

            <InputGroup
                name="title"
                placeholder="Enter your title"
                label="Title"
                error="Something went wrong"
            />
        </div>
    );
};

export default App;